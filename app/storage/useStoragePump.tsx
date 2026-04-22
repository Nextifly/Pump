import { persist, createJSONStorage } from 'zustand/middleware'
import passport_pump, { IPassportPump, IPassportPRCData1, IPassport1 } from '../(pages)/pump/[id]/passport/passport'
import { create } from 'zustand'

interface PassportStore {
  passports: IPassport1
  updatePump: (value: IPassportPump) => void
  addPRC: (value: IPassportPRCData1) => void
}

export const usePassportStore = create<PassportStore>()(
  persist(
    (set) => ({
      passports: passport_pump,

      updatePump: (value: IPassportPump) =>
        set((state) => ({
          ...state, // Обязательно сохраняем методы!
          passports: {
            ...state.passports,
            passport_pump: state.passports.passport_pump.map((p) =>
              p.id === value.id ? value : p
            ),
          },
        })),

      addPRC: (value: IPassportPRCData1) =>
        set((state) => {
          const exists = state.passports.passport_prc.some(
            (p) => p.id === value.id
          );

          return {
            ...state, // Обязательно сохраняем методы!
            passports: {
              ...state.passports,
              passport_pump: state.passports.passport_pump.map((p) =>
                p.id === value.id
                  ? {
                      ...p,
                      specification: {
                        ...p.specification,
                        reception: value.data.reception,
                        count: value.data.count,
                      },
                    }
                  : p
              ),
              passport_prc: exists
                ? state.passports.passport_prc.map((p) =>
                    p.id === value.id
                      ? {
                          ...p,
                          data: [
                            ...p.data,
                            {
                              id: value.data.id,
                              data: value.data.data,
                              iznos: value.data.iznos,
                              model: value.data.model,
                              check: value.data.check,
                            },
                          ],
                        }
                      : p
                  )
                : [
                    ...state.passports.passport_prc,
                    {
                      id: value.id,
                      data: [
                        {
                          id: value.data.id,
                          data: value.data.data,
                          iznos: value.data.iznos,
                          model: value.data.model,
                          check: value.data.check,
                        },
                      ],
                    },
                  ],
            },
          };
        }),
    }),
    {
      name: 'passport-storage-pump',
      storage: createJSONStorage(() => sessionStorage),
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