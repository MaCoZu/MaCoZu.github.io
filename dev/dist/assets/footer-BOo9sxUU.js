const n=`<hr class="mt-20 border-gray-200 dark:border-gray-700 md:mx-[10.5rem]">

<footer class="bg-transparent text-gray-700 dark:text-gray-200 mx-auto md:mx-[10.5rem] mb-2">
    <div class="container">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

            <!-- Logo and Name  -->
            <div class="">
                <div class="hidden md:block">
                    <div class="flex justify-between items-center">
                        <div class="flex gap-3 items-center">
                            <a>
                                <img id="logo2" class="h-16 fill-current dark:filter-white" src="/img/logo/logo.svg" alt="">
                            </a>
                            <div class="">
                                <p
                                    class="pb-3 text-lg font-literata font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">
                                    Marco</p>
                                <p
                                    class="text-lg font-literata font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">
                                    Zausch</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div class="flex flex-col sm:flex-row sm:gap-24 md:justify-between ">

                <!-- CONTACT ME -->
                <div class="py-2 md:py-0 flex-1">
                    <div class="text-sm uppercase font-medium">Contact </div>
                    <div class="flex items-center gap-3 my-2">
                        <img src="/img/icons/envelope-solid.svg" class="w-5 h-5 dark:filter-white"
                            id="envelope" />
                        <a class="hover:text-indigo-700" id="mlink" href="#mlink">Email</a>
                    </div>
                </div>


                <!-- WORK -->
                <div class="py-2 md:py-0 flex-1">
                    <div class="text-sm uppercase font-medium">Work</div>

                    <p class="mt-2 flex items-center">
                    <div class="flex items-center gap-3" aria-label="LinkedIn">
                        <img src="/img/icons/linkedin.svg" class="w-5 h-5 dark:filter-white" id="linkedin">
                        <a href="https://www.linkedin.com/in/marcozausch" target="_blank"
                            class="hover:text-indigo-700">LinkedIn</a>
                    </div>
                    </p>

                    <p class="mt-2 flex items-center">
                    <div class="flex items-center gap-3" aria-label="github">
                        <img src="/img/icons/github.svg" class="w-5 h-5 dark:filter-white" id="github">
                        <a href="https://github.com/MaCoZu" target="_blank" class="hover:text-indigo-700"
                            aria-label="Github">Github</a>
                    </div>
                    </p>
                </div>

                <!-- LEGAL -->
                <div class="py-2 md:py-0 flex-1">
                    <div class="text-sm uppercase font-medium">Legal</div>
                    <a class="mt-2 block hover:text-indigo-700" href="/pages/impressum.html">Impressum</a>
                    <a class="mt-2 block hover:text-indigo-700" href="/pages/privacypolicy.html">Privacy
                        Policy</a>
                </div>
            </div>
        </div>

    </div>
</footer>
`;export{n as default};
