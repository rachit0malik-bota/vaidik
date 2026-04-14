import { Link } from 'react-router-dom';
import { Magnetic } from '../ui/Magnetic';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 md:py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-semibold tracking-tight block mb-6 hover:opacity-80 transition-opacity">
              VAIDIK CO.
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              A premium global creative and language services company. We bridge the gap between production and global distribution.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/services#media" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Video Production</Link></li>
              <li><Link to="/services#media" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Post Production</Link></li>
              <li><Link to="/services#language" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Localization</Link></li>
              <li><Link to="/services#language" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">AI Language Data</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Vaidik Co. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
