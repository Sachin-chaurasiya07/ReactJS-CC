import { useState } from "react"

function App() {
  const [color , setColor] = useState("white")

  return (
    <>
    <div className="w-full h-screen duration-200 "
    style={{backgroundColor: color}}
    >
    <div className="fixed flex flex-wrap justify-center bottom-100 inset-x-0 px-2">
      <div className="fixed flex flex-wrap justify-center gap-3 shadow-lg bg-gray-200 px-3 py-2 rounded-2xl">
        <button
        onClick={()=> setColor("Red")}
        className="outline-none px-4 bg-red-500 py-1 rounded-full text-black shadow-lg"
        >
          Red
        </button>
        <button
        onClick={()=> setColor("Blue")}
        className="outline-none px-4 bg-blue-500 py-1 rounded-full text-black shadow-lg"
        >
          Blue
        </button>
        <button
        onClick={()=> setColor("Green")}
        className="outline-none px-4 bg-green-500 py-1 rounded-full text-black shadow-lg"
        >
          Green
        </button>
        <button
        onClick={()=> setColor("Violet")}
        className="outline-none px-4 bg-violet-500 py-1 rounded-full text-black shadow-lg"
        >
          violet
        </button>
        <button
        onClick={()=> setColor("orange")}
        className="outline-none px-4 bg-orange-500 py-1 rounded-full text-black shadow-lg"
        >
          orange
        </button>
        <button
        onClick={()=> setColor("gray")}
        className="outline-none px-4 bg-gray-500 py-1 rounded-full text-black shadow-lg"
        >
          gray
        </button>
        <button
        onClick={()=> setColor("yellow")}
        className="outline-none px-4 bg-yellow-500 py-1 rounded-full text-black shadow-lg"
        >
          Yellow
        </button>
        <button
        onClick={()=> setColor("pink")}
        className="outline-none px-4 bg-pink-500 py-1 rounded-full text-black shadow-lg"
        >
          pink
        </button>
        <button
        onClick={()=> setColor("Olive")}
        className="outline-none px-4 bg-emerald-900 py-1 rounded-full text-black shadow-lg"
        >
          Dark Green
        </button>
        <button
        onClick={()=> setColor("")}
        className="outline-none px-4 bg-amber-500 py-1 rounded-full text-black shadow-lg"
        >
          Amber
        </button>
        <button
        onClick={()=> setColor("Navy")}
        className="outline-none px-4 bg-blue-900 py-1 rounded-full text-black shadow-lg"
        >
          Navy
        </button>
        <button
        onClick={()=> setColor("Cyan")}
        className="outline-none px-4 bg-cyan-100 py-1 rounded-full text-black shadow-lg"
        >
          Cyan
        </button>
      </div>
      
    </div>
    </div>
    </>
  )
}

export default App
