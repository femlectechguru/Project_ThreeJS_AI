import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import Config from '../Config/config';
import state  from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, FilePicker, CustomButton, Tab } from '../components';



const customizer = () => {

  //check if we are in homepage or customizer
  const snap= useSnapshot(state) 

  const [file, setFile] = useState('');
 //AI prompt 
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker 
          file={file}
          setFile={setFile}
          readFile= {readFile}


          />
      case "aipicker":
        return <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}

         />
      
      default:
        return null;
    }
  };

  





  // Updated handleDecals function with lowercase 'type'
const handleDecals = (type, result) => {
  const decalType = DecalTypes[type.toLowerCase()]; // Convert 'type' to lowercase

  if (decalType) {
    state[decalType.stateProperty] = result;
    console.log('Updated State:', state);
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  } else {
    console.error(`Invalid decal type: ${type}`);
  }
};
  

const handleActiveFilterTab = (tabName) => {
  console.log("Updated state:", state);
  console.log("Updated activeFilterTab:", activeFilterTab);
  switch (tabName) {
    case "logoShirt":
      state.islogoTexture = !activeFilterTab[tabName];
      break;
    case "stylishShirt":
      state.isfullTexture = !activeFilterTab[tabName];
      break;
    default:
      state.islogoTexture = true;
      state.isfullTexture = false;
      break;
  }
  //after setting the state, activeFilterTab is updated  
  setActiveFilterTab((prevState) => {
    console.log("Previous state:", prevState);
    console.log("Final activeFilterTab state:", activeFilterTab);
    return {
      ...prevState,
      [tabName]: !prevState[tabName]
    }
  })
};

  useEffect(() => {
    // Perform actions or side effects based on the updated activeFilterTab state here.
    console.log("Updated activeFilterTab state:", activeFilterTab);
  }, [activeFilterTab]);
  

  const readFile = (type) => {
    reader(file)
    .then((result) =>{
      console.log('Result:', result);
      handleDecals(type, result);
      setActiveEditorTab("");

    })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
          key="custom"
          className='absolute top-0 left-0 z-10'
          {...slideAnimation('left')}>

            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab)=> (
                  <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={()=> setActiveEditorTab(tab.name)} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
          className='absolute z-10 top-5 right-5'
          {...fadeAnimation}>
            <CustomButton
            type="filled"
            title="Go Back"
            handleClick={()=> state.intro = true}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
          </motion.div>

          <motion.div
          className='filtertabs-container'{...slideAnimation('up')}>
            
            {FilterTabs.map((tab)=>(
                  <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={()=> handleActiveFilterTab(tab.name)} />
                ))}
          </motion.div>
        </>
      ) }
    </AnimatePresence>
  )
}

export default customizer