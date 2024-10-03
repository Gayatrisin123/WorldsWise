import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(e) => {
        //prevent default because onclick was submitting the form
        e.preventDefault();
        navigate(-1);
      }}
      type="primary"
    >
      &larr;Back
    </Button>
  );
}
