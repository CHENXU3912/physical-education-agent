-- 修复 sync_log RLS 策略
-- 在 Supabase Dashboard > SQL Editor 中执行

-- 方案：给 sync_log 添加 INSERT 策略（触发器写入需要）
DROP POLICY IF EXISTS "sync_coach_isolation" ON sync_log;
CREATE POLICY "sync_coach_insert" ON sync_log
  FOR INSERT WITH CHECK (true);
CREATE POLICY "sync_coach_select" ON sync_log
  FOR SELECT USING (coach_id = auth.uid());
