import { useState } from 'react';

import HelpArea from './HelpArea';

function MainContent() {
  const [helpVisible, setHelpVisible] = useState(false);

  function toggleHelp() {
    setHelpVisible((isVisible) => !isVisible);
  }

  return (
    <main className="my-8 mx-auto p-8 max-w-[50rem] bg-[#292d2d] rounded-lg text-white">
      <button
        onClick={toggleHelp}
        className="cursor-pointer bg-black text-white py-1 px-4 rounded border border-black font-[inherit]"
      >
        {helpVisible ? 'Hide' : 'Show'} Help
      </button>
      {helpVisible && <HelpArea />}
    </main>
  );
}

export default MainContent;
