---
title: How to create an AJAX Form in PHP with Google reCAPTCHA
pubDate: 2018-08-03
description: How to create an AJAX Form in PHP with Google reCAPTCHA.
draft: false
---

Recently, at my software development internship, I was tasked to redo our
company webpage with a new design. It is a static website that includes a
contact form which will send an email through PHP's mail function to our
company. The old contact form did not give the user any feedback whether the
email has been sent successfully or not. As part of the redesign, I wanted to
improve the user experience.

First things first, we will need to write the skeleton of our form in HTML. Here
is an example:

```html
<!-- ajax.html -->
<!doctype html>
<html lang="en">

<head>
    <title>AJAX Contact Form Sample</title>
    <script async src='https://www.google.com/recaptcha/api.js'></script>
    <meta name="author" content="Alexander Eckert" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
          crossorigin="anonymous">
    <!-- Font Awesome CSS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/solid.css"
          integrity="sha384-TbilV5Lbhlwdyc4RuIV/JhD8NR+BfMrvz4BL5QFa2we1hQu6wvREr3v6XSRfCTRp"
          crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/fontawesome.css"
          integrity="sha384-ozJwkrqb90Oa3ZNb+yKFW2lToAWYdTiF1vt8JiH5ptTGHTGcN7qdoR1F95e0kYyG"
          crossorigin="anonymous">
    <style>
        form i {
            color: #007BFF;
        }
    </style>
</head>

<body>
    <div class="container text-center p-5">
        <h1>AJAX Contact Form Sample</h1>
        <form id="ajax-contact" action="process-contact.php" method="post">
            <div class="form-row">
                <div class="col-md-8 mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">
                                <i class="fas fa-comments"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" name="subject" id="subject"
                               placeholder="Subject" aria-describedby="inputGroupPrepend"
                               required />
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">
                                <i class="fas fa-user-tie"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control" name="name" id="name"
                               placeholder="Your Name" aria-describedby="inputGroupPrepend"
                               required />
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-8 mb-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">
                                <i class="fas fa-comment-alt"></i>
                            </span>
                        </div>
                        <textarea class="form-control" rows="10" name="message" id="message"
                                  placeholder="Your Message" aria-describedby="inputGroupPrepend"
                                  required>
                        </textarea>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">
                                <i class="fas fa-at"></i>
                            </span>
                        </div>
                        <input type="email" class="form-control" name="email" id="email"
                               placeholder="company@example.com"
                               aria-describedby="inputGroupPrepend" required/>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">
                                <i class="fas fa-phone"></i>
                            </span>
                        </div>
                        <input type="tel" class="form-control" name="phone" id="phone"
                               placeholder="(907) 123-4567"
                               aria-describedby="inputGroupPrepend" required />
                    </div>
                    <div class="mb-3">
                        <div style="display: inline-block;" class="g-recaptcha"
                             data-sitekey="YOUR_SITE_KEY" id="reCaptcha"
                             data-callback="recaptchaCallback"></div>
                        <input type="hidden" name="source" value="AJAX Contact Form Sample" />
                    </div>
                    <input id="submit" class="btn btn-primary btn-block" name="submit"
                           type="submit" value="Send Contact Request" disabled>
                    </input>
                </div>
            </div>
            <div id="form-messages" class="alert" role="alert"></div>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"
            integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
            integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
            crossorigin="anonymous"></script>
    <script async src="js/contact-form.js"></script>
</body>

</html>
```

**Note:** You will need to manually go to [Google reCAPTCHA]'s website and
register your site with reCAPTCHA and then paste your site key in line 96 of my
sample code, where I wrote **YOUR_SITE_KEY**.

This is how the contact form will look like:

![Example contact form](../../assets/ajax-php-recaptcha-form/contact-form.png)

Before the user passed the reCAPTCHA, the submit button is disabled. Here is the
code that triggers when the reCAPTCHA is passed. Paste it into contact-form.js
in the folder JS at the root of your webpage.

```js
// contact-form.js
/*
 * For google recaptcha
 */
function recaptchaCallback() {
  $("#submit").prop("disabled", false);
}
```

To make the phone number input easier for the user, I wrote a short jQuery
function to automatically surround the area code in parentheses and add a dash
at the appropriate places.

```js
// contact-form.js
$(document).ready(function () {
  /*
   * For phone number input field
   */
  $("input[type='tel']").each(function () {
    $(this).on("change keyup paste", function (e) {
      var output,
        $this = $(this),
        input = $this.val();

      if (e.keyCode != 8) {
        input = input.replace(/[^0-9]/g, "");
        var area = input.substr(0, 3);
        var pre = input.substr(3, 3);
        var tel = input.substr(6, 4);
        if (area.length < 3) {
          output = "(" + area;
        } else if (area.length == 3 && pre.length < 3) {
          output = "(" + area + ")" + " " + pre;
        } else if (area.length == 3 && pre.length == 3) {
          output = "(" + area + ")" + " " + pre + "-" + tel;
        }
        $this.val(output);
      }
    });
  });
});
```

Next we will need to write our AJAX code to work as an intermediate layer
between our HTML site and our PHP code. Read the inline comments to see what
each part of the code does.

```js
// contact-form.js
$(document).ready(function () {
  /*
   * For phone number input field
   */
  $("input[type='tel']").each(function () {
    // truncated for this post
  });

  /*
   * AJAX code
   */
  // Get the form.
  var form = $("#ajax-contact");
  // Get the messages div.
  var formMessages = $("#form-messages");
  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();
    // Serialize the form data.
    var formData = $(form).serialize();
    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("alert-danger");
        $(formMessages).addClass("alert-success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#subject").val("");
        $("#phone").val("");
        $("#name").val("");
        $("#email").val("");
        $("#message").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("alert-success");
        $(formMessages).addClass("alert-danger");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occured and your message could not be sent.",
          );
        }
      });
  });
});
```

The AJAX code communicates with the PHP code and displays an error message or a
success message without reloading the page or redirecting to a success/error
page.

```php
// process-contact.php
<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
            $secret = 'YOUR_SITE_SECRET';

            $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);

            $responseData = json_decode($verifyResponse);

            if($responseData->success) {
                //  Extract information from POST Request
                $name = filter_var($_POST['name'],FILTER_SANITIZE_MAGIC_QUOTES);
                $email = filter_var($_POST['email'],FILTER_SANITIZE_EMAIL);
                $subject = filter_var($_POST['subject'],FILTER_SANITIZE_MAGIC_QUOTES);
                $phone = filter_var($_POST['phone'],FILTER_SANITIZE_MAGIC_QUOTES);
                $source = filter_var($_POST['source'],FILTER_SANITIZE_MAGIC_QUOTES);
                $message = filter_var($_POST['message'],FILTER_SANITIZE_MAGIC_QUOTES);
                if ( empty($message) OR empty($phone)) {
                    // Set a 400 (bad request) response code and exit.
                    http_response_code(400);
                    echo "Oops! There was a problem with your submission. Please complete the form and try again.";
                    exit;
                }

                // Hard coded destination for resulting email
                $email_to = "youremail@example.com";

                // Setup message
                $email_headers = "From: " . $email . "\r\n";
                $email_headers .= "Reply-To: " . $email_to . "\r\n";
                $email_headers .= "MIME-Version: 1.0\r\n";
                $email_headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

                $email_subject = $subject . " - Call Back Requested\r\n";

                $email_body = "<html><body>";
                $email_body .= "You have recieved a call back request via the " . $source . ".<br><br>";
                $email_body .= '<table style="width: 60%; text-align: left; border-collapse: collapse;">';
                $email_body .= '<tr><td style="padding: 10px 5px;"><strong>Name:</strong> </td><td style="padding: 10px 5px;">' . $name . "</td></tr>";
                $email_body .= '<tr style="background: #d5d5d5;"><td style="padding: 10px 5px;"><strong>Email:</strong> </td><td style="padding: 10px 5px;">' . $email . "</td></tr>";
                $email_body .= '<tr><td style="padding: 10px 5px;"><strong>Phone:</strong> </td><td style="padding: 10px 5px;">' . $phone . "</td></tr>";
                $email_body .= '<tr style="background: #d5d5d5;"><td style="padding: 10px 5px;"><strong>Message:</strong> </td><td style="padding: 10px 5px;">' . $message . "</td></tr>";
                $email_body .= "</table></body></html>";

                // Send the email.
                if (mail($email_to,$email_subject,$email_body,$email_headers)) {
                    // Set a 200 (okay) response code.
                    http_response_code(200);
                    echo "Thank You! Your message has been sent.";
                } else {
                    // Set a 500 (internal server error) response code.
                    http_response_code(500);
                    echo "Oops! Something went wrong and we couldn't send your message.";
                }
            } else {
                http_response_code(403);
                echo "There was a problem with your submission, please try again.";
            }
        } else {
            http_response_code(403);
            echo "There was a problem with your submission, please try again.";
        }
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
?>
```

**Note:** You will need to paste your site secret from your Google reCAPTCHA
registration into line 4 where I wrote **YOUR_SITE_SECRET**. Also, you should
specify your email at line 26.

If you did everything right, the resulting email will look like this:

![Resulting email](../../assets/ajax-php-recaptcha-form/email.png)

[google recaptcha]: https://www.google.com/recaptcha/intro/v3beta.html
