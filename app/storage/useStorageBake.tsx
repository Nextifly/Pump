import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import passport, { IPassportBake } from '../(pages)/bake/[id]/passport/passport'

interface PassportStore {
  passports: IPassportBake[];
  update: (value: IPassportBake) => void;
}

// Создаем хранилище
export const usePassportStore = create<PassportStore>()(
  persist(
    (set) => ({
      passports: passport,
      
      update: (value: IPassportBake) => 
        set((state) => ({
          passports: state.passports.map((p) =>
            p.name === value.name
              ? value
              : p
          ),
        })),
    }),
    {
      name: 'passport-storage-bake',
      storage: createJSONStorage(() => sessionStorage),
      // Добавьте этот метод для отладки
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('Ошибка гидратации', error);
        } else {
          console.log('Хранилище успешно загружено:', state);
        }
      },
    }
  )
);