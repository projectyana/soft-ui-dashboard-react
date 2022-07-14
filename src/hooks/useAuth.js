/**
 * Checks if the user is logged in.
 * Get user information from the session.
 */

import { useState, useEffect } from "react";

const useAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }

  return null;
};

export default useAuth;
