// src/store/carousel.ts
import { create } from "zustand";
import { slides } from "@constants";
import { CarouselState, Direction } from "@types";


export const useCarousel = create<CarouselState>((set, get) => ({
  index: 0,
  direction: 1,
  setIndex: (next, dir = (next > get().index ? 1 : -1)) =>
    set({ index: (next + slides.length) % slides.length, direction: dir as Direction }),
  next: () => get().setIndex(get().index + 1, 1),
  prev: () => get().setIndex(get().index - 1, -1),
  setById: (id) => {
    const i = slides.findIndex(s => s.id === id);
    if (i !== -1) get().setIndex(i);
  },
}));
