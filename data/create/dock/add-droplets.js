module.exports = [
  {
    id: 'Standard',
    title: 'Shared CPU: Standard Droplet',
    short_desc:
      "Standard Droplets have the most efficient CPU usage at a lower cost for workloads that would underuse dedicated threads. They're ideal for bursty applications that can handle variable levels of CPU",
    long_desc:
      "Standard Droplets have the most efficient CPU usage at a lower cost for workloads that would underuse dedicated threads. They're ideal for bursty applications that can handle variable levels of CPU. Standard Droplets come in a wide variety of configurations, from 1 vCPU / 1 GB memory to 32 vCPUs / 192 GB of memory. They also give you the flexibility to choose the memory to vCPU ratio most appropriate for your application. Standard Droplets are shared CPU, which are ideal for apps that mostly run at low to medium load, and occasionally burst for brief periods of time. For production workloads where time is of the essence or variable performance is intolerable, you should choose dedicated CPU Droplets."
  },
  {
    id: 'General Purpose',
    title: 'Dedicated CPU: General Purpose Droplet',
    short_desc:
      'General Purpose Droplets have a balanced ratio of memory to dedicated CPU, suitable for a wide variety of production workloads. General Purpose Droplets are available in six configurations ranging from 2 vCPUs up to 40 vCPUs, with 8 GB up to 160 GB of RAM. This 4:1 memory to CPU ratio is optimal for standard workloads',
    long_desc:
      "General Purpose Droplets have a balanced ratio of memory to dedicated CPU, suitable for a wide variety of production workloads. General Purpose Droplets are available in six configurations ranging from 2 vCPUs up to 40 vCPUs, with 8 GB up to 160 GB of RAM. This 4:1 memory to CPU ratio is optimal for standard workloads.They are also a good default choice if you're not sure which Droplet type is best for your application. All General Purpose Droplets have Intel Xeon Skylake processors, which have a 2.7GHz base clock speed and max Turbo frequency of 3.7 GHz. They're best for general purpose production workloads that require dedicated compute power."
  },
  {
    id: 'CPU-Optimized',
    title: 'Dedicated CPU: CPU-Optimized Droplet',
    short_desc:
      'General Purpose Droplets have a balanced ratio of memory to dedicated CPU, suitable for a wide variety of production workloads. General Purpose Droplets are available in six configurations ranging from 2 vCPUs up to 40 vCPUs, with 8 GB up to 160 GB of RAM. This 4:1 memory to CPU ratio is optimal for standard workloads.',
    long_desc:
      'General Purpose Droplets have a balanced ratio of memory to dedicated CPU, suitable for a wide variety of production workloads. General Purpose Droplets are available in six configurations ranging from 2 vCPUs up to 40 vCPUs, with 8 GB up to 160 GB of RAM. This 4:1 memory to CPU ratio is optimal for standard workloads. CPU-Optimized Droplets provide a 2:1 ratio of memory to CPU, ranging from 2 vCPUs with 4 GB of RAM up to 32 vCPUs and 64 GB of RAM. This configuration is optimal for applications that demand fast, consistent performance from dedicated vCPUs, but are not so memory-intensive that they require the additional RAM provided by General Purpose Droplets'
  },
  {
    id: 'Memory-Optimized',
    title: 'Dedicated CPU: Memory-Optimized Droplet',
    short_desc:
      'Some workloads, like large production databases or in-memory caches, require larger amounts of memory to store working sets of data. Without sufficient RAM, such applications typically run slowly, or can occasionally become unstable and crash. With 8 GB of RAM for each vCPU, Memory-Optimized Droplets are ideal for these applications',
    long_desc:
      "Some workloads, like large production databases or in-memory caches, require larger amounts of memory to store working sets of data. Without sufficient RAM, such applications typically run slowly, or can occasionally become unstable and crash. With 8 GB of RAM for each vCPU, Memory-Optimized Droplets are ideal for these applications.Memory-Optimized Droplets range from 2 vCPUs and 8 GB of RAM up to 32 vCPUs and 256 GB of memory. The additional memory can help you avoid excessively swapping to disk or getting out-of-memory errors, both of which significantly impact your application's performance and stability. They allow you to minimize cost per GB of memory, while still providing dedicated vCPUs."
  }
]
