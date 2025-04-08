// src/components/XLink.tsx
import React from "react";
import "../styles/link.css";

interface Props {
    href: string;
    children: React.ReactNode;
    showIcon?: boolean;
    className?: string;
}

export default function XLink({ href, children, showIcon, className }: Props) {
    const isExternal = href.startsWith("http");
    const shouldShowIcon = showIcon ?? isExternal;

    return (
        <a
            href={href}
            className={`x-link ${className || ''}`}
            data-external={isExternal}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
        >
            <span className="x-link-content">
                {children}
                {shouldShowIcon && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="x-link-icon"
                    >
                        <path fill="currentColor" d="M15 1.31a.5.5 0 0 0-.461-.309h-4a.5.5 0 0 0 0 1h2.79l-7.15 7.15a.5.5 0 0 0 .707.707l7.15-7.15v2.79a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.038-.188z" />
                        <path fill="currentColor" d="M3.5 3A2.5 2.5 0 0 0 1 5.5v7A2.5 2.5 0 0 0 3.5 15h7a2.5 2.5 0 0 0 2.5-2.5v-5a.5.5 0 0 0-1 0v5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 2 12.5v-7A1.5 1.5 0 0 1 3.5 4h5a.5.5 0 0 0 0-1z" />
                    </svg>
                )}
            </span>
        </a>
    );
}