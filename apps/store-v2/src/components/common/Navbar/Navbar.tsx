import Link from "next/link";
import { Logo, Container } from "@components/ui";

import { NavbarRoot } from "./NavbarRoot";
import { UserNav, Searchbar } from "@components/common";

import s from "./Navbar.module.css";

interface Link {
    href: string;
    label: string;
}

interface NavbarProps {
    links?: { title: string; id: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({ links: collections }) => {
    return (
        <NavbarRoot>
            <Container clean className=" h-16 flex items-center w-full text-small-regular transition-colors duration-200 bg-amazon_blue max-w-8xl mx-auto">
                <div className={s.nav}>
                    <div className="flex flex-1 items-center">
                        <Link href="/">
                            <>
                                <Logo short />
                            </>
                        </Link>
                    </div>
                    <Searchbar />
                    <div className="flex flex-1 items-center justify-end space-x-8">
                        <UserNav />
                    </div>
                </div>
                <div className="flex pb-4 lg:hidden lg:px-6">
                    <Searchbar id="mobile-search" />
                </div>
            </Container>
            <MenuCollections collections={collections}/>
        </NavbarRoot>
    );
};

export const MenuCollections = (props : any) => {
    const {collections} = props;

    return (
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                  {/* <p className="link flex items-center">
                      <Bars3Icon className="h-6 mr-1" />
                      All
                  </p> */}
                  <Link href="/search" className='link'>
                       All
                    </Link>
                  {collections?.map((col: any) => (
                    <Link
                        href={`/search/${col.id}`}
                        className={'link'}
                        key={col.id}
                    >
                        {col.title}
                    </Link>
                ))}
                  {/* <p className="link">Prime Video</p>
                  <p className="link">Amazon Business</p>
                  <p className="link">Today's Deals</p>
                  <p className="link hidden lg:inline-flex">Electronics</p>
                  <p className="link hidden lg:inline-flex">Food & Grocery</p>
                  <p className="link hidden lg:inline-flex">Prime</p>
                  <p className="link hidden lg:inline-flex">Buy Again</p>
                  <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                  <p className="link hidden lg:inline-flex">Health & Personal Care</p> */}
              </div>
    )
  }
