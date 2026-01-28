const FormSection = () => {
  return (
    <section className="form">
      <form>
        <input type="text" placeholder="Enter your name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default FormSection;
