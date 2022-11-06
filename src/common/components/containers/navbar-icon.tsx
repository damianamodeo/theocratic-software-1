export const NavbarIcon = ({ title, active, setActive }) => {
  return (
    <>
      <div
        className={`h-full flex-auto flex flex-col items-center justify-center gap-1 landscape:flex-row ${
          active === title ? "bg-primaryLightest" : ""
        }`}
        onClick={() => {
          setActive(title);
        }}
      >
        {title}
      </div>
    </>
  );
};
