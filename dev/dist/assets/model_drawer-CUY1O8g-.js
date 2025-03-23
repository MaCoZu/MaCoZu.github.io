const l=`<!-- drawer  -->
<div class="hidden md:flex z-50">
    <div id="drawer-toggle"
        class="fixed z-30 top-1/2 right-0 inline-block p-2 transition-all duration-200 rounded-lg cursor-pointer">
        <svg class="w-10 h-10 md:w-full md:h-full dark:text-white" width="50" height="100" viewBox="0 0 50 100"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 H40 M10 20 H40 M10 30 H40" style="stroke: #CCC; fill:none; stroke-width: 4px"
                stroke-opacity="0.7" stroke-linecap="round">
            </path>
        </svg>
    </div>

    <div id="sidebar_model"
        class="fixed top-0 right-0 z-50 w-1/5 h-full transition-all duration-500 transform translate-x-full bg-white dark:bg-gray-800 shadow-lg">
        <div class="px-6 py-4">

            <!-- Tabel of Content  -->
            <ul class="text-lg font-work mt-4">
                <li class="mb-2"><a href="/src/pages/model_gallery/toc_graph/index.html" class="block font-semibold hover:text-indigo-400">TOC Graph</a></li>
                <li class="mb-2"><a href="/src/pages/model_gallery/model/index.html" class="block hover:text-indigo-400">Model</a></li>
                <li class="mb-2"><a href="/src/pages/model_gallery/demand_and_supply/index.html" class="block hover:text-indigo-400">Supply and Demand</a></li>
                <li class="mb-2"><a href="/src/pages/model_gallery/schelling_segregation/index.html" class="block hover:text-indigo-400">Segregation</a></li>
                <li class="mt-1"><a href="/src/pages/model_gallery/confusion_matrix/index.html" class="block hover:text-indigo-400"> Confusion Matrix</a></li>
                <li class="mt-1"><a href="/src/pages/model_gallery/logistic_growth/index.html" class="block hover:text-indigo-400"> Logistic Growth</a>
                </li>
                <li class="mt-1"><a href="/src/pages/model_gallery/linear_regression/index.html" class="block hover:text-indigo-400">Linear Regression</a></li>
                <li class="mt-1"><a href="/src/pages/model_gallery/logistic_map/index.html" class="block hover:text-indigo-400"> Logistic Map</a></li>
                <li class="mt-1"><a href="/src/pages/model_gallery/normal_distribution/index.html" class="block hover:text-indigo-400">Normal Distribution</a></li>
            </ul>

            <div class="text-xs fixed bottom-10 flex row">
                <a href="index.html" class="flex items-center">
                    <img id="logo2" class="h-8 sm:h-8 fill-current dark:filter-white"
                        src="/img/logo/logo.svg" alt="logo">
                </a>
            </div>
        </div>
    </div>
</div>`;export{l as default};
