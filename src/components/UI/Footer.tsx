interface FooterProps {
  copyrightLabel: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ copyrightLabel }: FooterProps) {
  return (
    <p className="flex gap-2">
      &copy; {CURRENT_YEAR}.
      <a
        className="text-gray hover:text-blue font-bold duration-100 dark:hover:text-sky-400"
        href="https://bogdan-bogdanovic.com/"
      >
        {copyrightLabel}
      </a>
    </p>
  );
}
