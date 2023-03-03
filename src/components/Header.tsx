import { SiteLogo } from "@assets/index";

export default function Header() {
    return (
        <header className="flex items-center justify-center mt-12 md:mt-0">
            <h1>
                <span className="sr-only">splitter</span>
                <SiteLogo />
            </h1>
        </header>
    );
}
