import * as yup from "yup";

export const ENschema = yup.object().shape({
    Name: yup
      .string()
      .matches(/^[A-Z]/, "First letter should be uppercase")
      .required("Name is required"),
    Email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    Password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
        "Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character",
      )
      .required("Password is required"),
    });

    export const RUschema = yup.object().shape({
        Name: yup
          .string()
          .matches(/^[A-Z]/, "Первая буква должна быть заглавной")
          .required("Имя обязательно"),
        Email: yup
          .string()
          .email("Неправильный формат адресса")
          .required("Email обязателен"),
        Password: yup
          .string()
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
            "Пароль должен содержать как минимум 1 цифру, 1 заглавную букву, 1 строчную букву и 1 специальный символ.",
          )
          .required("Пароль обязателен"),
        });

        export const ENschemaLogin = yup.object().shape({
          Email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
          Password: yup
            .string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
              "Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character",
            )
            .required("Password is required"),
          });
      
          export const RUschemaLogin = yup.object().shape({
              Email: yup
                .string()
                .email("Неправильный формат адресса")
                .required("Email обязателен"),
              Password: yup
                .string()
                .matches(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/,
                  "Пароль должен содержать как минимум 1 цифру, 1 заглавную букву, 1 строчную букву и 1 специальный символ.",
                )
                .required("Пароль обязателен"),
              });