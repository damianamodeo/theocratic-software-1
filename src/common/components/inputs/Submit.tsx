export const Submit = ({ action, children }) => {
  return (
    <button
      className="mx-auto w-56 bg-button hover:bg-buttonHover py-2 px-6 text-center font-noto text-white dark:bg-buttonD dark:text-black "
      type="submit"
      onClick={action}
    >
      {children}
    </button>
  );
};
