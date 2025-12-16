
function SearchHeader() {
  return (

     <nav>
        <a href="index.html"className="logo__text">TaskNest</h1>

        <div className="nav__actions">
          <a href="login.html" class="login">Login</a>
          <a href="signup.html" class="signup">Sign Up</a>
          <input className="switch-bulb"  type="checkbox"/>
        </div>
      </nav>
     
  
  );
}

export default SearchHeader;