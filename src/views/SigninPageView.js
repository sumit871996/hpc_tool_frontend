import axios from "axios";
import { Box, Button, Form, FormField, Heading, Text, TextInput } from "grommet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SigninPageView=()=>{

    const navigate= useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
      });
    
      const handleChangeData = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit=(e)=>{
        console.log(formData.username)
        console.log(formData.password)
    
        axios.post(`http://localhost:8081/auth/signin`,formData).then((res)=>{
            console.log(res.data)
            const token=res.data.token
            const userId= res.data.id
            console.log(token)
            localStorage.setItem('auth_token',token)
            localStorage.setItem("user_id",userId)
            navigate("/home")
        }).catch((err)=>{
            console.error(err)
        })
      
      }
    
    return(
        <Box gap="medium" fill pad={"medium"}>
          <Heading>Login</Heading>
          <Text>Please Enter The Credentials</Text>
          <Box>
            <Form>
              <FormField label="Username" name="username" htmlFor="username">
                <TextInput
                  name="username"
                  id="username"
                  value={formData.username}
                  placeholder="Enter Username"
                  onChange={handleChangeData}
                />
              </FormField>
              <FormField label="Password" name="password" htmlFor="password">
                <TextInput
                  name="password"
                  id="password"
                  value={formData.password}
                  placeholder="Enter Password"
                  onChange={handleChangeData}
                />
              </FormField>
              <Button  margin={{ top: "5%" }} label="Login" primary  onClick={() => handleSubmit()}/>
            </Form>
          </Box>
        </Box>
    )
}
export  default SigninPageView;