const db = require('./database');
const fs = require('fs');
const path = require('path');

const initDb = async () => {
    try {
        console.log('⏳ Initializing Database...');

        // Read the schema files
        const schemaFile = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        const refreshSchemaFile = fs.readFileSync(path.join(__dirname, 'refresh_tokens_schema.sql'), 'utf8');
        const categoryAttributeSchemaFile = fs.readFileSync(path.join(__dirname, 'category_attribute_schema.sql'), 'utf8');
        const productSchemaFile = fs.readFileSync(path.join(__dirname, 'product_schema.sql'), 'utf8');

        // Split the SQL commands (basic split by semicolon)
        const commands = [
            ...schemaFile.split(';'),
            ...refreshSchemaFile.split(';'),
            ...categoryAttributeSchemaFile.split(';'),
            ...productSchemaFile.split(';')
        ].map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);

        for (let command of commands) {
            try {
                await db.query(command);
            } catch (cmdError) {
                // Ignore "Index already exists" or "Duplicate index" errors
                if (cmdError.code === 'ER_DUP_KEYNAME') {
                    // console.log(`⏩ Skipping duplicate index: ${command.substring(0, 50)}...`);
                } else if (cmdError.code === 'ER_TABLE_EXISTS_ERROR') {
                    // console.log(`⏩ Table already exists: ${command.substring(0, 50)}...`);
                } else {
                    console.warn(`⚠️ Warning on command: ${command.substring(0, 50)}...`);
                    console.warn(`Detail: ${cmdError.message}`);
                }
            }
        }

        console.log('✅ Database Tables Created/Verified Successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database Initialization Failed:', error.message);
        process.exit(1);
    }
};

initDb();
