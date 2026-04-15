import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
function SignUp({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(error.response.data.message || "Server error");
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("Request failed");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an account</h3>
      <p className="text-xs text-slate-700 mt-1.5 mb-6">
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <Input
          type="text"
          label="Full Name"
          placeholder="John Doe"
          className="border p-2 rounded"
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
        />
        <Input
          type="email"
          label="Email"
          placeholder="John@example.com"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Min 8 Characters"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          Sign up
        </button>
        <p className="text-[12px] text-slate-800 mt-3">
          Already have an account?{}{" "}
          <button
            type="button"
            className="font-medium text-green-600 underline cursor-pointer"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
