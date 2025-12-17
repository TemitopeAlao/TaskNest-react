function AddTaskBtn({ children, onClick, id, className }) {
  return (
    <button id={id} className={className} onClick={onClick}>
      <span>+</span> {children}
    </button>
  );
}

export default AddTaskBtn;
