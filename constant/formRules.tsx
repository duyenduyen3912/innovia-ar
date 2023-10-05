export default {
    emailRules : [
        {
          required: true,
          type: "email",
          message: "The input is not valid E-mail!",
        }
        
      ],
      phoneRules : [
        {
          pattern: /^[0-9]{10}$/,
          message: 'Invalid phone number. Please enter 10 digits',
        },
        {
          required: true,
          message: 'Please input your phone number',
        },
      ]
}