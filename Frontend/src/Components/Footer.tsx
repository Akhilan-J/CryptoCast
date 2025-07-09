import { Link } from "react-router";

function Footer() {
  return (
    <footer className="isolate mx-auto max-w-7xl p-6 pb-12 pt-16 lg:px-8 text-white">
      <div className="border-t border-white/10 pt-4 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on LinkedIn"
            className="group flex h-6 w-6 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-300"
            href="https://www.linkedin.com/in/akhilan-jeyaraj/"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-label="LinkedIn"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M21 1.5H3c-.83 0-1.5.68-1.5 1.51V21c0 .83.67 1.51 1.5 1.51h18c.82 0 1.5-.68 1.5-1.51V3c0-.83-.68-1.51-1.5-1.51Zm-13.15 18H4.73V9.48h3.12V19.5ZM6.29 8.1a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm13.22 11.4h-3.1v-4.88c0-1.16-.03-2.65-1.63-2.65-1.62 0-1.87 1.26-1.87 2.57v4.96h-3.1V9.48h2.98v1.37h.04a3.28 3.28 0 0 1 2.95-1.62c3.15 0 3.73 2.08 3.73 4.78v5.49Z"></path>
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on GitHub"
            className="group flex h-6 w-6 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-300"
            href="https://github.com/Akhilan-J"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-label="GitHub"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
          </a>
        </div>
        <div className="mt-8 flex items-center gap-4 text-xs font-medium leading-5 text-zinc-400 max-md:flex-col md:order-1 md:mt-0">
          <div className="order-2 md:order-1">
            <p>© 2025 CryptoCast </p>
          </div>
          <div className="order-1 flex gap-4 md:order-2">
            <Link
              to="/Privacy"
              className="transition-colors duration-200 hover:text-zinc-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/Terms"
              className="transition-colors duration-200 hover:text-zinc-300"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full text-xs leading-5 text-zinc-500 max-md:text-center md:max-w-[60%]">
        <p className="mt-2">
          CryptoCast provides cryptocurrency price forecasting and analysis
          tools. Past performance does not guarantee future results.
          Cryptocurrency investments carry significant risk.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
