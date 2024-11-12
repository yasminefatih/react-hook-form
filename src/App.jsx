import {
  Card,
  Input,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

const App = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    unregister,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const domain = watch("domain");

  useEffect(() => {
    if (domain !== "others") {
      unregister("otherdomainname");
    }
  }, [domain, unregister]);

  const onSubmit = (data) => console.log(data);

  return (
    <div className="h-screen grid place-items-center bg-gray-50">
      <Card
        color="transparent"
        shadow={true}
        className="p-5 bg-white w-full max-w-lg"
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <br />
        <form
          className="mb-4 w-full grid gap-6 grid-cols-1 md:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <Controller
              name="Username"
              rules={{
                required: "Username is Required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Username"
                  error={Boolean(errors?.Username?.message)}
                  className="w-full"
                />
              )}
            />
            {errors?.Username?.message && (
              <span className="error-text">{errors?.Username?.message}</span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email ID is Required",
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Email ID is invalid",
                },
              }}
              render={({ field }) => (
                <Input
                  type="email"
                  size="lg"
                  {...field}
                  label="Email ID"
                  error={Boolean(errors?.email?.message)}
                  className="w-full"
                />
              )}
            />
            {errors?.email?.message && (
              <span className="error-text">{errors?.email?.message}</span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="domain"
              control={control}
              rules={{
                required: "Domain is Required",
              }}
              render={({ field }) => (
                <Select
                  label="Select Domain"
                  {...field}
                  error={Boolean(errors?.domain?.message)}
                  className="w-full"
                >
                  <Option value="designer">Designer</Option>
                  <Option value="dev">Developer</Option>
                  <Option value="tester">Tester</Option>
                  <Option value="others">Others</Option>
                </Select>
              )}
            />
            {errors?.domain?.message && (
              <span className="error-text">{errors?.domain?.message}</span>
            )}
          </div>
          {domain === "others" && (
            <div className="w-full">
              <Controller
                name="otherdomainname"
                control={control}
                rules={{
                  required: "Domain Name is Required",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    label="Type Here"
                    error={Boolean(errors?.otherdomainname?.message)}
                    className="w-full"
                  />
                )}
              />
              {errors?.otherdomainname?.message && (
                <span className="error-text">
                  {errors?.otherdomainname?.message}
                </span>
              )}
            </div>
          )}
          <div className="w-full">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is Required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                  message: "Password not strong enough",
                },
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  size="lg"
                  label="Password"
                  error={Boolean(errors?.password?.message)}
                  className="w-full"
                />
              )}
            />
            {errors?.password?.message && (
              <span className="error-text">{errors?.password?.message}</span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="confirmpassword"
              control={control}
              rules={{
                required: "Confirm Password is Required",
                validate: (value) =>
                  getValues("password") === value || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  size="lg"
                  label="Confirm Password"
                  error={Boolean(errors?.confirmpassword?.message)}
                  className="w-full"
                />
              )}
            />
            {errors?.confirmpassword?.message && (
              <span className="error-text">
                {errors?.confirmpassword?.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone Number is Required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Phone Number"
                  error={Boolean(errors?.phone?.message)}
                  className="w-full"
                />
              )}
            />
            {errors?.phone?.message && (
              <span className="error-text">{errors?.phone?.message}</span>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 gap-3">
            <Button type="reset" variant="outlined" onClick={() => reset()}>
              Reset
            </Button>
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default App;
