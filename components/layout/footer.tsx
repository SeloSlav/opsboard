import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features", external: false },
      { label: "Workflow", href: "#workflow", external: false },
      { label: "Dashboard", href: "#metrics", external: false },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Story", href: "/story", external: true },
      { label: "Blog", href: "/blog", external: true },
      { label: "Contact", href: "mailto:martin.erlic@gmail.com", external: true },
    ],
  },
];

type FooterProps = {
  hideProductLinks?: boolean;
};

export function Footer({ hideProductLinks = false }: FooterProps) {
  return (
    <footer className="section-spacing border-t border-slate-200/70 bg-white/40">
      <div className="max-content-width grid gap-10 md:grid-cols-[1.8fr_1fr_1fr] text-sm text-slate-600">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-2xl shadow-md shadow-sky-200/60">
              <Image
                src="/logo.png"
                alt="Nimbra logo"
                fill
                className="object-cover"
                sizes="44px"
              />
            </span>
            <span className="text-lg font-semibold text-slate-900">Nimbra</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            A multi-tenant client operations portal built for agencies that need real-time status, RBAC, and audit trails that clients actually understand.
          </p>
          <div className="flex items-center gap-4 text-slate-700">
            <Link
              href="https://github.com/SeloSlav/nimbra"
              target="_blank"
              className="transition-colors hover:text-slate-900"
            >
              <FiGithub className="text-xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/seloslav"
              target="_blank"
              className="transition-colors hover:text-slate-900"
            >
              <FiLinkedin className="text-xl" />
            </Link>
            <Link href="mailto:martin.erlic@gmail.com" className="transition-colors hover:text-slate-900">
              <FiMail className="text-xl" />
            </Link>
          </div>
        </div>

        {footerLinks.map((section) => {
          const isProduct = section.heading === "Product";

          if (hideProductLinks && isProduct) {
            return <div key={section.heading} />;
          }

          return (
            <div key={section.heading} className="space-y-3">
              <h4 className="text-slate-900 text-sm font-semibold uppercase tracking-[0.2em]">
                {section.heading}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      className="transition-colors text-slate-600 hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="max-content-width mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <span>© {new Date().getFullYear()} Nimbra. Crafted for portfolio storytelling.</span>
        <span>Deployed on Railway · Built with Next.js, Prisma, PostgreSQL.</span>
      </div>
    </footer>
  );
}
