import { useEffect, useState } from "react";
import "./App.css";

const expenseCategories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Work",
  "Other",
];

const initialExpenses = [
  {
    id: 1,
    title: "Groceries",
    description: "Weekly market essentials",
    amount: 2480,
    date: "2026-04-24",
    category: "Food",
  },
  {
    id: 2,
    title: "Team Lunch",
    description: "Sprint celebration lunch",
    amount: 1320,
    date: "2026-04-21",
    category: "Work",
  },
  {
    id: 3,
    title: "Internet Bill",
    description: "Monthly broadband recharge",
    amount: 899,
    date: "2026-04-18",
    category: "Bills",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const today = new Date().toISOString().split("T")[0];
const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const geminiModel = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

const emptyForm = {
  title: "",
  description: "",
  amount: "",
  date: today,
  category: "Food",
};

const expenseExtractionSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Short expense title with 2 to 6 words.",
    },
    description: {
      type: "string",
      description: "One short helpful note about the expense.",
    },
    amount: {
      type: "number",
      description: "Expense amount as a positive number without currency symbols.",
      minimum: 0,
    },
    date: {
      type: "string",
      description: "Expense date in YYYY-MM-DD format.",
      format: "date",
    },
    category: {
      type: "string",
      description: "Best matching expense category.",
      enum: expenseCategories,
    },
  },
  required: ["title", "description", "amount", "date", "category"],
};

const getInitialExpenses = () => {
  try {
    const savedExpenses = localStorage.getItem("expenses");
    if (!savedExpenses) {
      return initialExpenses;
    }

    const parsedExpenses = JSON.parse(savedExpenses);
    return Array.isArray(parsedExpenses) ? parsedExpenses : initialExpenses;
  } catch {
    return initialExpenses;
  }
};

const normalizeExpensePayload = (payload) => ({
  title: typeof payload.title === "string" ? payload.title.trim() : "",
  description:
    typeof payload.description === "string" ? payload.description.trim() : "",
  amount:
    typeof payload.amount === "number"
      ? String(Math.round(payload.amount))
      : "",
  date:
    typeof payload.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(payload.date)
      ? payload.date
      : today,
  category: expenseCategories.includes(payload.category)
    ? payload.category
    : "Other",
});

const getGeminiErrorMessage = (payload, status) => {
  const apiMessage = payload?.error?.message;

  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage;
  }

  return `Gemini request failed with status ${status}.`;
};

function App() {
  const [expenses, setExpenses] = useState(getInitialExpenses);
  const [form, setForm] = useState(emptyForm);
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [aiStatus, setAiStatus] = useState({
    tone: "idle",
    text: "Describe a transaction in plain English and Gemini will add it for you.",
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const addExpense = (expensePayload) => {
    setExpenses((current) => [{ id: Date.now(), ...expensePayload }, ...current]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedDescription = form.description.trim();
    const parsedAmount = Number(form.amount);

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !parsedAmount ||
      parsedAmount < 1
    ) {
      return;
    }

    const expensePayload = {
      title: trimmedTitle,
      description: trimmedDescription,
      amount: parsedAmount,
      date: form.date,
      category: form.category,
    };

    if (editingExpenseId) {
      setExpenses((current) =>
        current.map((expense) =>
          expense.id === editingExpenseId
            ? { ...expense, ...expensePayload }
            : expense,
        ),
      );
      setEditingExpenseId(null);
    } else {
      addExpense(expensePayload);
    }

    setForm(emptyForm);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses((current) =>
      current.filter((expense) => expense.id !== expenseId),
    );

    if (editingExpenseId === expenseId) {
      setEditingExpenseId(null);
      setForm(emptyForm);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpenseId(expense.id);
    setForm({
      title: expense.title,
      description: expense.description,
      amount: String(expense.amount),
      date: expense.date,
      category: expense.category,
    });
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
    setForm(emptyForm);
  };

  const handleAddExpenseWithAi = async () => {
    const prompt = aiPrompt.trim();

    if (!prompt) {
      setAiStatus({
        tone: "error",
        text: "Add a short expense description first so Gemini has something to add.",
      });
      return;
    }

    if (!geminiApiKey) {
      setAiStatus({
        tone: "error",
        text: "Missing VITE_GEMINI_API_KEY. Add it to your Vite env file to enable AI expense adding.",
      });
      return;
    }

    setIsExtracting(true);
    setAiStatus({
      tone: "loading",
      text: "Gemini is reading the note and adding the expense.",
    });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Extract one expense from the note below.

Today's date is ${today}.
Return only the structured expense details so the app can add the expense automatically.
If the note uses a relative date like today, yesterday, last Friday, or this morning, convert it to an absolute YYYY-MM-DD date using today's date.
Choose the closest valid category from this list: ${expenseCategories.join(", ")}.
If the amount is unclear, estimate nothing and set it to 0.

Expense note:
${prompt}`,
                  },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: "application/json",
              responseJsonSchema: expenseExtractionSchema,
            },
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(getGeminiErrorMessage(data, response.status));
      }

      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        throw new Error("Gemini did not return parsable expense content.");
      }

      const parsedExpense = JSON.parse(responseText);
      const normalizedExpense = normalizeExpensePayload(parsedExpense);

      if (
        !normalizedExpense.title ||
        !normalizedExpense.description ||
        !normalizedExpense.amount ||
        Number(normalizedExpense.amount) < 1
      ) {
        throw new Error("Gemini could not confidently extract a complete expense.");
      }

      addExpense({
        ...normalizedExpense,
        amount: Number(normalizedExpense.amount),
      });
      setAiPrompt("");
      setEditingExpenseId(null);
      setForm(emptyForm);
      setAiStatus({
        tone: "success",
        text: `Added "${normalizedExpense.title}" to your expenses.`,
      });
    } catch (error) {
      setAiStatus({
        tone: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong while extracting the expense.",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const filteredExpenses =
    activeCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === activeCategory);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlySpend = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);
      const now = new Date();
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
  const averageSpend = expenses.length
    ? Math.round(totalSpent / expenses.length)
    : 0;

  const topCategory = expenseCategories.reduce(
    (best, category) => {
      const total = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);

      if (total > best.total) {
        return { name: category, total };
      }

      return best;
    },
    { name: "None", total: 0 },
  );

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Smart personal finance</p>
          <h1>Expense tracker that feels calm, clear, and in control.</h1>
          <p className="hero-text">
            Capture spending in seconds, scan your recent activity, and spot
            where your money goes with a dashboard designed to be useful and
            beautiful.
          </p>

          <div className="summary-grid">
            <article className="summary-card warm">
              <span>Total spent</span>
              <strong>{currencyFormatter.format(totalSpent)}</strong>
              <small>Across {expenses.length} expenses</small>
            </article>
            <article className="summary-card cool">
              <span>This month</span>
              <strong>{currencyFormatter.format(monthlySpend)}</strong>
              <small>Live monthly snapshot</small>
            </article>
            <article className="summary-card neutral">
              <span>Average spend</span>
              <strong>{currencyFormatter.format(averageSpend)}</strong>
              <small>Per transaction</small>
            </article>
            <article className="summary-card accent">
              <span>Top category</span>
              <strong>{topCategory.name}</strong>
              <small>{currencyFormatter.format(topCategory.total)}</small>
            </article>
          </div>
        </div>

        <section className="form-panel">
          <div className="panel-header">
            <h2>{editingExpenseId ? "Edit expense" : "Add expense"}</h2>
            <p>
              {editingExpenseId
                ? "Update the details below and save your changes."
                : "Keep each transaction short and searchable."}
            </p>
          </div>

          <form className="expense-form" onSubmit={handleFormSubmit}>
            <div className="ai-panel">
              <div className="ai-panel-copy">
                <p className="ai-kicker">Gemini AI add</p>
                <h3>Turn a message into a saved expense</h3>
                <p>
                  Try something like "Paid 799 for Uber from airport yesterday
                  for work travel".
                </p>
              </div>

              <label>
                Expense note
                <textarea
                  name="aiPrompt"
                  rows="4"
                  placeholder="Bought groceries for 2,480 on Sunday for the week ahead."
                  value={aiPrompt}
                  onChange={(event) => setAiPrompt(event.target.value)}
                />
              </label>

              <div className="ai-actions">
                <button
                  className="ai-button"
                  type="button"
                  onClick={handleAddExpenseWithAi}
                  disabled={isExtracting}
                >
                  {isExtracting ? "Adding..." : "Add with Gemini"}
                </button>
                <span className={`ai-status ${aiStatus.tone}`}>{aiStatus.text}</span>
              </div>
            </div>

            <label>
              Title
              <input
                name="title"
                type="text"
                placeholder="Dinner with friends"
                value={form.title}
                onChange={handleChange}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                rows="3"
                placeholder="Quick note about the expense"
                value={form.description}
                onChange={handleChange}
              />
            </label>

            <div className="form-row">
              <label>
                Amount
                <input
                  name="amount"
                  type="number"
                  min="1"
                  placeholder="2500"
                  value={form.amount}
                  onChange={handleChange}
                />
              </label>

              <label>
                Date
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {expenseCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-actions">
              <button className="primary-button" type="submit">
                {editingExpenseId ? "Save Changes" : "Add Expense"}
              </button>

              {editingExpenseId ? (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </section>
      </section>

      <section className="tracker-panel">
        <div className="tracker-header">
          <div>
            <p className="eyebrow">Recent activity</p>
            <h2>Spending timeline</h2>
          </div>

          <div className="filter-row">
            {["All", ...expenseCategories].map((category) => (
              <button
                key={category}
                className={
                  category === activeCategory
                    ? "filter-chip active"
                    : "filter-chip"
                }
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="expense-list">
          {filteredExpenses.length ? (
            filteredExpenses.map((expense) => (
              <article className="expense-card" key={expense.id}>
                <div className="expense-main">
                  <div className="expense-badge">
                    {expense.category.slice(0, 1)}
                  </div>
                  <div>
                    <div className="expense-topline">
                      <h3>{expense.title}</h3>
                      <span>{currencyFormatter.format(expense.amount)}</span>
                    </div>
                    <p>{expense.description}</p>
                    <div className="expense-meta">
                      <span>{expense.category}</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="expense-actions">
                  <button
                    className="ghost-button edit-button"
                    type="button"
                    onClick={() => handleEditExpense(expense)}
                  >
                    Edit
                  </button>
                  <button
                    className="ghost-button danger"
                    type="button"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h3>No expenses in this category yet</h3>
              <p>
                Switch the filter or add a new expense to populate your tracker.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
