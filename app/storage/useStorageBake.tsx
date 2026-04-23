import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// Убедитесь, что импорт верный
import passportData, { IParams, ModeEntry } from '../(pages)/bake/[id]/passport/passport'

interface PassportStore {
  passports: ModeEntry[];
  // Переименовал в updateValues для ясности
  updateValues: (name: string, newValues: IParams[]) => void;
}

export const usePassportStore = create<PassportStore>()(
  persist(
    (set) => ({
      passports: passportData,
      
      updateValues: (name: string, newValues: IParams[]) => set((state) => ({
        passports: state.passports.map((p) => 
          p.name === name 
            ? { ...p, values: newValues } // Сохраняем name, обновляем values
            : p
        )
      }))
    }),
    {
      name: 'passport-storage-bake',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) console.log('Ошибка гидратации', error);
        else console.log('Хранилище успешно загружено');
      },
    }
  )
);