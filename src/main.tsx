import { createRoot } from 'react-dom/client';
import { Site } from './Site';
import { defaultTheme } from './theme';

createRoot(document.getElementById('root')!).render(<Site theme={defaultTheme} />);
