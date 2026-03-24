import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key not configured. Running in demo mode.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Helper functions for website operations
export const saveWebsite = async (websiteData) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .insert([websiteData])
      .select();
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error saving website:', error);
    return { success: false, error: error.message };
  }
};

export const getWebsite = async (websiteId) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', websiteId)
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching website:', error);
    return { success: false, error: error.message };
  }
};

export const updateWebsite = async (websiteId, updates) => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .update(updates)
      .eq('id', websiteId)
      .select();
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error updating website:', error);
    return { success: false, error: error.message };
  }
};

export const createOrder = async (orderData) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    if (error) throw error;
    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};
