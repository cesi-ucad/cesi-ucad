"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Section from "../../components/Section";

export default function ContactPage() {
  return React.createElement(
    "div",
    { className: "min-h-screen bg-white" },
    React.createElement(Header, null),
    React.createElement(
      Section,
      { title: "Contactez-nous", className: "max-w-3xl mx-auto" },
      React.createElement(
        "div",
        { className: "bg-white rounded-lg shadow-sm p-6" },
        React.createElement(
          "p",
          { className: "text-gray-700 mb-6" },
          "Pour toute question ou renseignement, envoyez-nous un message via le formulaire ci-dessous ou contactez-nous directement par e-mail ou téléphone."
        ),
        React.createElement(
          "form",
          {
            className: "grid grid-cols-1 gap-4",
            action: "https://formsubmit.co/ucadcesi@gmail.com",
            method: "POST",
          },
          React.createElement("input", {
            type: "hidden",
            name: "_subject",
            value: "Nouveau message du site CESI UCAD",
          }),
          React.createElement("input", {
            type: "hidden",
            name: "_captcha",
            value: "false",
          }),
          React.createElement("input", {
            type: "hidden",
            name: "_next",
            value: "https://cesi-ucad.sn/contact?success=true",
          }),
          React.createElement(
            "label",
            { className: "block" },
            React.createElement(
              "span",
              { className: "text-sm font-medium text-gray-700" },
              "Nom"
            ),
            React.createElement("input", {
              type: "text",
              name: "name",
              required: true,
              className:
                "mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-primary-500 focus:border-primary-500",
            })
          ),
          React.createElement(
            "label",
            { className: "block" },
            React.createElement(
              "span",
              { className: "text-sm font-medium text-gray-700" },
              "Adresse e‑mail"
            ),
            React.createElement("input", {
              type: "email",
              name: "email",
              required: true,
              className:
                "mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-primary-500 focus:border-primary-500",
            })
          ),
          React.createElement(
            "label",
            { className: "block" },
            React.createElement(
              "span",
              { className: "text-sm font-medium text-gray-700" },
              "Message"
            ),
            React.createElement("textarea", {
              name: "message",
              rows: 5,
              required: true,
              className:
                "mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-primary-500 focus:border-primary-500",
            })
          ),
          React.createElement(
            "div",
            { className: "flex items-center justify-between mt-2" },
            React.createElement(
              "button",
              {
                type: "submit",
                className:
                  "px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors",
              },
              "Envoyer"
            ),
            React.createElement(
              "div",
              { className: "text-sm text-gray-600" },
              React.createElement(
                "div",
                null,
                "Ou contactez-nous : ",
                React.createElement(
                  "a",
                  {
                    href: "mailto:ucadcesi@gmail.com",
                    className: "text-primary-600",
                  },
                  "ucadcesi@gmail.com"
                )
              ),
              React.createElement(
                "div",
                { className: "mt-1" },
                "Téléphone : ",
                React.createElement(
                  "a",
                  { href: "tel:+221000000000", className: "text-primary-600" },
                  "+221 00 000 0000"
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(Footer, null)
  );
}
