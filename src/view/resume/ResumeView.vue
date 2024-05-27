<script>
export default {
  name: "ResumeView"
}
</script>

<template>
  <div class="flex flex-col items-center justify-center p-3">

    <!----------- Medium Screen Button ------------->
    <!--Color ratios for 3D button illusion -->
    <div class="hidden md:flex">
      <a href="resume/Matthew_Peach_Resume.pdf" download="Matthew_Peach_Resume">
        <button class="text-amber-100 bg-indigo-700 hover:bg-indigo-600 font-bold py-2 px-4 border-b-4 border-indigo-800 hover:border-indigo-700 rounded">
          Download my Resum&eacute;
        </button>
      </a>
    </div>

    <div>
      <img src="/resume/Matthew_Peach_Resume.jpg"/>
    </div>

    <!----------- Small Screen Button ------------->
    <div class="md:hidden">
      <a href="resume/Matthew_Peach_Resume.pdf" download="Matthew_Peach_Resume">
        <button class="text-amber-100 bg-indigo-700 hover:bg-indigo-600 font-bold py-1 px-2 border-b-2 border-indigo-800 hover:border-indigo-700 rounded">
          Download my Resum&eacute;
        </button>
      </a>
    </div>

  </div>
</template>