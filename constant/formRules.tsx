export default {
    emailRules : [
        {
          required: true,
          type: "email",
          message: "Email không đúng định dạng!",
        }
        
      ],
      phoneRules : [
        {
          pattern: /^[0-9]{10}$/,
          message: 'Số điện thoại không đúng định dạng',
        },
        {
          required: true,
          message: 'Hãy nhập số điện thoại',
        },
      ],
      passwordRules : [
        {
          pattern: /^(?=.*[A-Z])/,
          message: 'Ít nhất một chữ cái viết hoa',
        },
        {
          pattern: /^(?=.*[!@#$%^&*.,])/,
          message: 'Ít nhất một ký tự đặc biệt',
        },
        {
          pattern: /^.{8,}$/,
          message: 'Ít nhất 8 ký tự',
        },
        {
          required: true,
          message: 'Hãy nhập mật khẩu',
        }
      ]
}