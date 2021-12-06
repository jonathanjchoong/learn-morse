<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width" />
    <!-- Normalize, Bootstrap, and Font Awesome core CSS -->
    <!-- Latest compiled and minified CSS -->
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <title>Learn Morse - Login</title>

    <!-- Custom CSS and JS imports -->
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width" />
    <link
      rel="stylesheet"
      href="/static/CSS/universal.css"
    />
    <!-- Change the tab icon -->
    <link rel = ' shortcut icon' href = "/static/images/morse.png"/>
    
<link
  rel="stylesheet"
  href="/static/CSS/login.css"
/>


    <!--FONTS -->
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Fira%20Mono"
    />
  </head>
  <body>
    <nav class="navbar navbar-dark navbar-expand-lg sticky-top">
      <a class="navbar-brand" href="/">
        <img src="../static/images/morse.png" class="logo">
        Learn Morse</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarText"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Play
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="/play/flashcards">
                Flashcards
              </a>
              <a class="dropdown-item" href="/play/write">Write</a>
              <a class="dropdown-item" href="/play/read">Read</a>
              <a class="dropdown-item" href="/play/listen"> Listen </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/learn">Learn </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile">Profile </a>
          </li>
        </ul>
        <ul class="navbar-nav">
          
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/signup">Signup</a>
          </li>
          
        </ul>
      </div>
    </nav>

    
<div class="login-page">
  <div class="login-fields">
    <h2>Login</h2>
    <form action="" method="post" novalidate>
      <input id="csrf_token" name="csrf_token" type="hidden" value="ImExYjkwNWZjNDYwZDkyNGJiOTNiMzdlZTk0MjhlOWMxNGU4NDcwYWQi.Ya4AMA.8wzqB5SWsx7XR7b2g0xi739gJSA">
      <p>
        <label for="email">Email</label>
        <br>
        
        <input id="email" name="email" required size="25" type="email" value="">
        
  
      </p>
      <p>
        <label for="password">Password</label>
        <br>
        
        <input id="password" name="password" required size="25" type="password" value="">
        
      </p>
      <p>
        <input id="remember_me" name="remember_me" type="checkbox" value="y"> <label for="remember_me">Remember Me</label>
      </p>
      <p><input id="submit" name="submit" type="submit" value="Submit"></p>
    </form>
    <a class="loginredirect" href="/signup">Don't have an account?</a>
  </div>
</div>


    <!-- Default vs custom footer-->
    
    <!-- Standard footer -->
    <footer class="morse">
      <div class="links">
        <div class="linkgroup">
          <span style="font-weight: bolder">BRAND</span>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </div>
        <div class="linkgroup">
          <span style="font-weight: bolder;">USER</span>
          <a href="/learn">Learn</a>
          <a href="/profile">Profile</a>
        </div>
        <div class="linkgroup">
          <span style="font-weight: bolder;">PLAY</span>
          <a href="/play/flashcards">Flashcards</a>
          <a href="/play/write">Write</a>
        </div>
        <div class="linkgroup">
          <span style="visibility: hidden;">line</span>
          <a href="/play/read">Read</a>
          <a href="/play/listen">Listen</a>
        </div>
        </div>
      </div>
      <div id="logo-block">
        <img src="../static/images/morse.png" class="logo-black">
        <span style="padding:10px">
          Learn Morse (2021)
        </span>
      </div>
    </div>
  </footer>
    
  </body>
</html>