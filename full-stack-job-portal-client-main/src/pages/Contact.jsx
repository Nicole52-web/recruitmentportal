import { useRef } from "react";
import Navbar from "../components/shared/Navbar";
import emailjs from '@emailjs/browser'
import { TextField, Button, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contact = () => {
    const form = useRef();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_eyqibci', 'template_k6usi9c', form.current, 'pRxOgLuLic4MqmwCs')
        .then((result) => {
            console.log(result.text);
            Swal.fire(
              'Great!',
              'Your message has been sent!',
              'success'
          );
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset(form);
    };
  
  
    return (
  
      <>
  
      <Navbar/>
  
  <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
          <Typography variant="h4" align="center" mb={2}>
            Contact Us
          </Typography>
          <form ref={form} onSubmit={sendEmail}>
          <TextField
    fullWidth
    label="Name"
    name="user_name"
    margin="normal"
    required
    {...register("user_name", {
        required: "Name is required",
        pattern: {
            value: /^[A-Za-z][A-Za-z0-9 ]*$/,
            message: "Username can't start with number or special characters"
        }
    })}
/>
            <TextField
    fullWidth
    label="Email"
    name="user_email"
    margin="normal"
    required
    type="email"
    {...register("user_email", {
        required: "Email is required",
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            message: "Enter a valid email",
        },
    })}
/>
            <TextField
              fullWidth
              label="Message"
              name="message"
              margin="normal"
              required
              multiline
              rows={4}
            />
            <Button variant="contained" type="submit" value="Send" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
  
     
  
      </>
      
    );
}

export default Contact
