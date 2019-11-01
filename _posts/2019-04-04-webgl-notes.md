---
layout: post

title: webgl notes
---

For performance, avoid object allocation in the render loop. Reuse objects and arrays where possible, and avoid built-in array methods such as map and filter. Each new object creates more work for the Garbage Collector, and in some cases, GC pauses can freeze an application for multiple frames every few seconds.

alpha depth stencil antialias preserveDrawingBuffer 影响内存与性能

