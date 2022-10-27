export const Navbar = ({ children }) => {
  return (
    <>
      <div
        className="
          h-[10%] flex  w-full items-end-xxx items-center justify-around border-t border-bgDark bg-bg
          dark:border-bgDarkD dark:bg-bgD
          landscape:h-10-xxx landscape:items-center "
      >
        {children}
      </div>
    </>
  );
};

// md:h-screen md:w-navW md:flex-col md:items-center md:justify-start md:border-r md:border-t-0 landscape:md:h-screen 
