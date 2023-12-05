interface IFooterProps {
  copyrightLabel: string;
}

const Footer: React.FC<IFooterProps> = ({ copyrightLabel }) => {
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <footer className="text-white flex justify-center py-4">
      <p className="flex gap-2">
        © {getCurrentYear()}.
        <a
          className="text-gray font-bold duration-100 hover:text-blue"
          href="https://bogdan-bogdanovic.com/"
        >
          {copyrightLabel}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
