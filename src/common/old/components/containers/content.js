export const Content = ({ children, bgColor }) => {
  const styles = "fixed h-screen w-screen " + bgColor;

  return (
    <>
      {/* <div className={` -z-1 ${styles}`}></div> */}
      <div
        className="


        grow
        
        "
        // overscroll-y-contain 
        // md:left-navW
          // landscape:md:bottom-0 absolute inset-y-navW inset-x-0 overflow-auto
          // md:right-0 md:bottom-0 landscape:bottom-10  -z-1 "
      >
        {children}
      </div>
    </>
  );
};
