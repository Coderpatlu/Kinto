import React, {useState} from 'react';

const initialState = {
    name : "",
    email : "",
    password : "",
    confirmPassword: ""
};

const Signup = () => {

    const [form, setForm] = useState(initialState);
    const [errors, setError] = useState({});
    const [success, setSuccess] = useState("");

    const validate = (values) => {
        const errs = {};

        if(!values.name.trim()) errs.name = "Name is required";
        if(!values.name.trim()){
            errs.email = "Email is required";
        }else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errs.email = "Email is invailed";
        } 
       if(!values.password){
            errs.password = "Password is required";
        }else if (values.password.lenght <= 8) {
            errs.email = "Password must be at least 8 Characters.";
        } 
        if(values.confirmPassword !== values.password) {
            errs.confirmPassword = "Password do not match";
        } 
        return errs;
    }
    const handleChange = (e) => {
        const { name, value} = e.target;
        setForm((prev) => ({
            ...prev , [name]: undefined 
        }));
        setSuccess("");
    }

    const handleSubmit = (e) => {
        e.preventDefult();
        const v = validate(form);
        setError(v);
        if(Object.keys(v).length === 0) {
            console.log("Signup Data:", form);
            setSuccess("Signup successful! ");
            setForm(initialState);
        } else {
            setSuccess("");
        }
    };
  return (
    <div>
        <section>
            <h2>Create Your Account</h2>
            <form action="#">
                <div>
                    <label htmlFor="Name">
                     Enter Your  Name
                    </label><br />
                    <input type="text" name="Name" id="name" value={form.name} onChange={handleChange} required/>
                    {errors.name && <div role="alert">{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="Email">
                        Enter Your Email
                    </label><br />
                    <input type="text" name="email" id="email" value={form.email} onChange={handleChange} required />
                    {errors.email && <div role="alert">{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="Password">Enter Password</label><br />
                    <input type="text" name="password" id="password" value={form.password} onChange={handleChange} required/>
                    {errors.password && <div role="alert">{errors.password}</div>}
                </div>
                <div>
                    <label htmlFor="Confirm Password">Confirm Password</label><br />
                    <input type="text" name="confirmpassword" id="confirmpassword" value={form.confirmPassword} onChange={handleChange} required/>
                    {errors.confirmPassword && <div role="alert">{errors.confirmPassword}</div>}
                </div>

                <div style={{marginTop: 8}}>
                    <button type='submit' >Sign Up</button>
                </div>

            </form>
        </section>
    </div>
  )
}

export default Signup