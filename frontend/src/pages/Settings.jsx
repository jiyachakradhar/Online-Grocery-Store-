// src/pages/Settings.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Button from "../components/common/Button";
import UsernameForm from "../components/UpdateSections/UsernameForm";
import EmailForm from "../components/UpdateSections/EmailForm";
import PasswordForm from "../components/UpdateSections/PasswordForm";
import LogoutSection from "../components/UpdateSections/LogoutSection";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("username");
  const navigate = useNavigate();

  return (
    <Container>
      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Settings</h2>
          <Button
            variant={activeSection === "username" ? "active" : "secondary"}
            label="Username"
            onClick={() => setActiveSection("username")}
            className="mb-2 w-full"
          />
          <Button
            variant={activeSection === "email" ? "active" : "secondary"}
            label="Email"
            onClick={() => setActiveSection("email")}
            className="mb-2 w-full"
          />
          <Button
            variant={activeSection === "password" ? "active" : "secondary"}
            label="Change Password"
            onClick={() => setActiveSection("password")}
            className="mb-2 w-full"
          />
          <Button
            variant={activeSection === "logout" ? "active" : "secondary"}
            label="Logout"
            onClick={() => setActiveSection("logout")}
            className="mb-2 w-full"
          />
          <Button
            variant="secondary"
            label="Back"
            className="w-full"
            onClick={() => navigate(-1)}
          />
        </aside>

        {/* Main Content */}
        <main className="w-3/4 bg-white p-6 rounded-lg shadow-md h-full">
          {activeSection === "username" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Update Username</h1>
              <UsernameForm />
            </div>
          )}

          {activeSection === "email" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Update Email</h1>
              <EmailForm />
            </div>
          )}

          {activeSection === "password" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Change Password</h1>
              <PasswordForm />
            </div>
          )}

          {activeSection === "logout" && <LogoutSection />}
        </main>
      </div>
    </Container>
  );
};

export default Settings;
