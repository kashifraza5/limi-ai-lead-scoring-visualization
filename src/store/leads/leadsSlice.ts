import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lead } from "@/types/lead";

interface LeadsState {
  leads: Lead[];
  selectedLead: Lead | null;
}

const initialState: LeadsState = {
  leads: [],
  selectedLead: null,
};

const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);

      if (action.payload.status === "hot") {
        state.selectedLead = action.payload;
      }
    },

    updateLead: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Lead> }>
    ) => {
      const lead = state.leads.find(l => l.id === action.payload.id);
      if (lead) {
        Object.assign(lead, action.payload.updates);
      }
    },

    setSelectedLead: (state, action: PayloadAction<Lead | null>) => {
      state.selectedLead = action.payload;
    },
  },
});

export const { addLead, updateLead, setSelectedLead } = leadsSlice.actions;
export default leadsSlice.reducer;
