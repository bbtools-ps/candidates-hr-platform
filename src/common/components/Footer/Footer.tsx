interface IFooterProps {
  copyrightLabel: string;
}

const Footer: React.FC<IFooterProps> = ({ copyrightLabel }) => {
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <p className="flex gap-2">
      © {getCurrentYear()}.
      <a
        className="font-bold text-gray duration-100 hover:text-blue"
        href="https://bogdan-bogdanovic.com/"
      >
        {copyrightLabel}
      </a>
    </p>
  );
};

export default Footer;
