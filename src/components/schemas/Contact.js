import * as Yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
    emails: Yup.array( 
        Yup.object().shape({
            email: Yup.string().email("Invalid Email"),
            favourite: Yup.boolean()      
        })        
        )
      .required("Required"),
    phoneNumbers: Yup.array(
        Yup.object().shape({
            number: Yup.string().matches(phoneRegExp, "Invalid phone number"),
            favourite: Yup.boolean()      
        })
    ).required("Required"),
    favourite: Yup.boolean()
  });

export default ContactSchema;