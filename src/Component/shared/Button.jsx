function Button({ children, variant = 'primary', onClick, type = 'button' }) {
  const styles = {
    primary: "btn-vogue",
    outline: "btn-outline",
    danger: "btn-delete"
  };

  return (
    <button 
      type={type} 
      className={`base-button ${styles[variant]}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;