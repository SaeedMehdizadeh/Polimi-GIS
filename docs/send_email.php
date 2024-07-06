if(isset($_Post['name']){
         $to = "Receiver Email Id ";
         $subject = "Your Subject";
         $name = trim($_POST['name']);
         $email = $_Post['email'];
         $telefon = $_Post['telefon'];
         $subject = $_Post['subject'];
         $message = $_Post['message'];
         $body = "Name: ".$name.'\n';
         $body .= "Email: ".$email.'\n';
         $body .= "Subject: ".$subject.'\n';
         $body .= "Message: ".$message.'\n';
         mail($to,$subject,$body);
     }