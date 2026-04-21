import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import passport, { IPassport } from '../(pages)/pump/[id]/passport/passport'

interface PassportStore {
  passports: IPassport[];
  update: (value: IPassport) => void;
}

// Создаем хранилище
export const usePassportStore = create<PassportStore>()(
  persist(
    (set) => ({
      passports: passport,
      
      update: (value: IPassport) => 
        set((state) => ({
          passports: state.passports.map((p) =>
            p.id === value.id
              ? value
              : p
          ),
        })),
    }),
    {
      name: 'passport-storage',
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