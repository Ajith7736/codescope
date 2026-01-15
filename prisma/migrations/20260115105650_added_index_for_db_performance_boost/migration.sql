-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "analysis_projectId_idx" ON "analysis"("projectId");

-- CreateIndex
CREATE INDEX "issues_analysisId_idx" ON "issues"("analysisId");

-- CreateIndex
CREATE INDEX "overview_projectId_idx" ON "overview"("projectId");

-- CreateIndex
CREATE INDEX "project_id_userId_idx" ON "project"("id", "userId");

-- CreateIndex
CREATE INDEX "session_userId_token_idx" ON "session"("userId", "token");

-- CreateIndex
CREATE INDEX "usage_userId_idx" ON "usage"("userId");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
